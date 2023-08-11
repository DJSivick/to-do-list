namespace ToDoApp.Models
{
    public class ToDo
    {   
        public string id { get; set; }
        public string user_email { get; set; }

        public string title { get; set; }

        public string description { get; set; }

        public DateTime date { get; set; }

        public int progress { get; set; }

        public int status { get; set; }
    }
}
