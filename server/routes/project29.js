import express from "express";
import axios from "axios";
import { parse } from "csv-parse/sync";

const router = express.Router();

// Helper function to fetch all pages for a player
async function fetchAllPages(playerName, type) {
    let page = 1;
    let results = [];
    while (true) {
        const response = await axios.get(
            `https://echoes.mobi/api/killmails?page=${page}&${type}_name=${encodeURIComponent(playerName)}`
        );
        const data = parse(response.data, { columns: true, skip_empty_lines: true });
        if (data.length === 0) break; // stop if no more results
        results = results.concat(data);
        page++;
    }
    return results;
}

// Render main search page
router.get("/", (req, res) => {
    res.render("project29/index", {
        error: null,
        playerName: null,
        dataK: [],
        dataV: [],
        topRegions: []
    });
});

// Handle search + data processing
router.get("/submit", async (req, res) => {
    try {
        const playerName = req.query.name?.trim();
        if (!playerName) {
            return res.render("project29/index", {
                error: "Please enter a player name.",
                playerName: null,
                dataK: [],
                dataV: [],
                topRegions: []
            });
        }

        // Fetch all pages concurrently
        const [dataV, dataK] = await Promise.all([
            fetchAllPages(playerName, "victim"),
            fetchAllPages(playerName, "killer")
        ]);

        const allData = [...dataK, ...dataV];

        // Build hierarchical structure
        const regionMap = {};
        allData.forEach(row => {
            const region = row.region?.trim();
            const constellation = row.constellation?.trim();
            const system = row.system?.trim();
            if (!region) return;

            if (!regionMap[region]) regionMap[region] = { count: 0, constellations: {} };
            regionMap[region].count++;

            if (constellation) {
                if (!regionMap[region].constellations[constellation]) {
                    regionMap[region].constellations[constellation] = { count: 0, systems: {} };
                }
                regionMap[region].constellations[constellation].count++;

                if (system) {
                    regionMap[region].constellations[constellation].systems[system] =
                        (regionMap[region].constellations[constellation].systems[system] || 0) + 1;
                }
            }
        });

        // Convert to topRegions array
        const topRegions = Object.entries(regionMap)
            .map(([region, data]) => {
                const constellations = Object.entries(data.constellations)
                    .sort((a, b) => b[1].count - a[1].count)
                    .slice(0, 5)
                    .map(([constellation, constData]) => ({
                        name: constellation,
                        count: constData.count,
                        systems: Object.entries(constData.systems)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([system, count]) => ({ name: system, count }))
                    }));

                const maxConstellationCount = constellations.length ? Math.max(...constellations.map(c => c.count)) : 0;

                return {
                    region,
                    count: data.count,
                    constellations,
                    maxConstellationCount
                };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // top 5 regions

        // Compute global max system count
        let maxSystemCount = 0;
        topRegions.forEach(r => {
            r.constellations.forEach(c => {
                c.systems.forEach(s => {
                    if (s.count > maxSystemCount) maxSystemCount = s.count;
                });
            });
        });

        res.render("project29/index", {
            error: null,
            playerName,
            dataK,
            dataV,
            topRegions,
            maxSystemCount
        });

    } catch (error) {
        console.error("Error:", error.message);
        res.render("project29/index", {
            error: "Failed to fetch data.",
            playerName: null,
            dataK: [],
            dataV: [],
            topRegions: [],
            maxSystemCount: 0
        });
    }
});

export default router;
