using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class WorkRequestEquipments
    {
        [Key]
        public int idd { get; set; }

        public int BasicInfoId { get; set; }

        public string name { get; set; }

        public string type { get; set; }

        public string coordinate { get; set; }

        public string adress { get; set; }
    }
}
