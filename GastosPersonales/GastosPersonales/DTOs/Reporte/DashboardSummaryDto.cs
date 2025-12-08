using System.Collections.Generic;

namespace GastosPersonales.DTOs.Reporte
{
    public class DashboardSummaryDto
    {
        public decimal TotalSpentThisMonth { get; set; }
        public MonthOverMonthComparisonDto MonthOverMonthComparison { get; set; }
        public List<TopCategoryDto> TopCategories { get; set; }
        public SummaryChartDataDto SummaryChartData { get; set; }
        public List<BudgetAlertDto> BudgetAlerts { get; set; }
    }

    public class MonthOverMonthComparisonDto
    {
        public decimal ThisMonth { get; set; }
        public decimal LastMonth { get; set; }
    }

    public class TopCategoryDto
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }

    public class SummaryChartDataDto
    {
        public List<string> Labels { get; set; }
        public List<ChartDatasetDto> Datasets { get; set; }
    }

    public class ChartDatasetDto
    {
        public string Label { get; set; }
        public List<decimal> Data { get; set; }
        public List<string> BackgroundColor { get; set; }
        public int HoverOffset { get; set; }
    }

    public class BudgetAlertDto
    {
        public string Category { get; set; }
        public double Percentage { get; set; }
        public decimal Limit { get; set; }
        public decimal Spent { get; set; }
    }
}
