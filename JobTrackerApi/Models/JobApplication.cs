namespace JobTrackerApi.Models
{
    public class JobApplication
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Role { get; set; }
        public string Status { get; set; } // Applied, Interview, Offer, Rejected
        public DateTime DateApplied { get; set; }
        public string? Notes { get; set; }
        public string? ResumeLink { get; set; }
    }
}
