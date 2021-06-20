using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class WorkRequestHistoryOfChanges
    {
        [Key]
        public int idd { get; set; }

        public int BasicInfoId { get; set; }

        public string name { get; set; }

        public string lastname { get; set; }

        public string dateofchanges { get; set; }

        public string status { get; set; }
    }
}
