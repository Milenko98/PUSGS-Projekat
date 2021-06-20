using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class WorkRequestBasicInfo
    {
        [Key]
        public int idd { get; set; }

        public string id { get; set; }

        public string type { get; set; }

        public string status { get; set; }

        public string incident { get; set; }

        public string typeOfWork { get; set; }

        public string startDateTime { get; set; }

        public string endDateTime { get; set; }

        public string createdBy { get; set; }

        public string company { get; set; }

        public string phoneNum { get; set; }

        public string dateTimeCreated { get; set; }

        public string purpose { get; set; }

        public string details { get; set; }

        public string notes { get; set; }

        public string adress { get; set; }

        public bool emergencyWork { get; set; }
    }
}
