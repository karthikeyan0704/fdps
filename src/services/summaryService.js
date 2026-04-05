const dashboardSummaryService = {
    calculateFinancialOverview: () => {
        const allTransactions = db.getRecords();
        
        let totalIncome = 0;
        let totalExpense = 0;
        const categoryBreakdown = {};
        const dailyTrends = {};
        
        // We iterate once through all transactions to build our dashboard data efficiently
        allTransactions.forEach(transaction => {
            const amount = parseFloat(transaction.amount);

            // 1. Calculate overall totals
            if (transaction.type === 'income') {
                totalIncome += amount;
            } else if (transaction.type === 'expense') {
                totalExpense += amount;
            }

            // 2. Build Category Breakdown
            if (!categoryBreakdown[transaction.category]) {
                categoryBreakdown[transaction.category] = 0;
            }
            // Contribution to category balance
            categoryBreakdown[transaction.category] += (transaction.type === 'expense' ? -amount : amount);

            // 3. Build Daily Trends
            const entryDate = transaction.date;
            if (!dailyTrends[entryDate]) {
                dailyTrends[entryDate] = { income: 0, expense: 0 };
            }
            if (transaction.type === 'income') {
                dailyTrends[entryDate].income += amount;
            } else {
                dailyTrends[entryDate].expense += amount;
            }
        });

        // Calculate the net balance (what's left over)
        const netBalance = totalIncome - totalExpense;

        // Get the latest 5 activities to show on the dashboard "Recent" section
        const recentActivity = [...allTransactions]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        return {
            overview: {
                totalIncome,
                totalExpense,
                netBalance,
            },
            categoryBreakdown,
            recentActivity,
            trends: Object.entries(dailyTrends).map(([date, stats]) => ({
                date,
                ...stats
            }))
        };
    }
};

module.exports = dashboardSummaryService;
