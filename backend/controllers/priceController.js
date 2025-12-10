import axios from 'axios';

export const getSymbols = async (req, res) => {
    try {
        const { symbol } = req.query;

        if (!symbol) {
            return res.status(400).json({ message: "Symbol is required" });
        }

        const finnhubSymbol = symbol;

        const url = "https://finnhub.io/api/v1/quote";

        const response = await axios.get(url, {
            params: {
                symbol: finnhubSymbol,
                token: process.env.FINNHUB_API_KEY
            }
        });

        const data = response.data;
        // data = { c: current, h: high, l: low, o: open, pc: prev close, t: timestamp }

        if (!data || data.c === undefined) {
            return res.status(404).json({ message: "Could not fetch price for symbol" });
        }

        return res.json({
            symbol, currentPrice: data.c, high: data.h, low: data.l, open: data.o, prevClose: data.pc, timestamp: data.t,
        });
    } catch (error) {
        // console.error("Finnhub error:", error.response?.data || error.message);
        return res.status(400).json({ message: "Error fetching price" });
    }
}

export const searchSymbols = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: "Query (q) is required" });
        }

        const response = await axios.get("https://finnhub.io/api/v1/search", {
            params: {
                q, token: process.env.FINNHUB_API_KEY
            }
        });

        const all = response.data.result || [];

        const results = all
            .filter(
                (s) =>
                    s.symbol &&
                    s.type === "Common Stock" &&
                    !s.symbol.includes(".") // most US stocks are plain like AAPL, MSFT
            )
            .map((s) => ({
                symbol: s.symbol,
                description: s.description,
                type: s.type,
            }));

        // let filtered = all.filter(s => s.symbol && s.symbol.endsWith(".NS"));

        // if (filtered.length === 0) {
        //     filtered = all.filter(s => s.symbol && (s.symbol.endsWith(".BO") || /^[A-Z]+$/.test(s.symbol)));
        // }

        res.json(results);
    } catch (error) {
        // console.error(
        //     "Symbol search error:",
        //     error.response?.status,
        //     error.response?.data || error.message
        // );
        res.status(500).json({ message: "Error searching symbols" });
    }
}

export const getPriceHistory = async (req, res) => {
    try {
        const { symbol, resolution = "D", range = "3M" } = req.query;
        if (!symbol) {
            return res.status(400).json({ message: "Symbol is required" });
        }

        const now = Math.floor(Date.now() / 1000);
        let from;

        switch (range) {
            case "1W":
                from = now - 7 * 24 * 60 * 60;
                break;
            case "1M":
                from = now - 30 * 24 * 60 * 60;
                break;
            case "3M":
                from = now - 90 * 24 * 60 * 60;
                break;
            case "1Y":
                from = now - 365 * 24 * 60 * 60;
                break;
            default:
                from = now - 90 * 24 * 60 * 60; // 3M
        }

        const response = await axios.get("https://finnhub.io/api/v1/stock/candle", {
            params: {
                symbol, resolution, from, to: now, token: process.env.FINNHUB_API_KEY
            }
        });

        const data = response.data;

        if (data.s !== "ok") {
            return res.status(400).json({ message: "No data for this symbol" });
        }

        const candles = data.t.map((t, idx) => ({
            time: t, open: data.o[idx], high: data.h[idx], low: data.l[idx], close: data.c[idx], volume: data.v[idx]
        }));

        res.json({ symbol, candles });
    } catch (error) {
        // console.error(
        //     "Price history error:",
        //     error.response?.data || error.message
        // );
        res.status(500).json({ message: "Error fetching price history" });
    }
}

export const getStockDetails = async (req, res) => {
    try {
        const { symbol } = req.params;
        if (!symbol) {
            return res.status(400).json({ message: "symbol is required" });
        }

        const token = process.env.FINNHUB_API_KEY;

        const [profileRes, quoteRes] = await Promise.all(([
            axios.get("https://finnhub.io/api/v1/stock/profile2", {
                params: { symbol, token }
            }),
            axios.get("https://finnhub.io/api/v1/quote", {
                params: { symbol, token },
            }),
        ]));

        const profile = profileRes.data;
        const quote = quoteRes.data;

        res.json({
            symbol,
            name: profile.name,
            exchange: profile.exchange,
            currency: profile.currency,
            country: profile.country,
            logo: profile.logo,
            weburl: profile.weburl,
            industry: profile.finnhubIndustry,
            marketCap: profile.marketCapitalization,
            ipo: profile.ipo,
            // quote bits
            currentPrice: quote.c,
            open: quote.o,
            high: quote.h,
            low: quote.l,
            prevClose: quote.pc,
            change: quote.d,
            changePercent: quote.dp,
            updatedAt: quote.t,
        });
    } catch (error) {
        // console.error(
        //     "Stock details error:",
        //     error.response?.data || error.message
        // );
        res.status(500).json({ message: "Error fetching stock details" });
    }
}