using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class WorkRequest
    {
        [Key]
        public int id { get; set; }

        public WorkRequestBasicInfo basicinfo { get; set; }

        public ICollection<WorkRequestHistoryOfChanges> historyofchanges { get; set; }

        public ICollection<WorkRequestMultimedia> multimedia { get; set; }

        public ICollection<WorkRequestEquipments> equipments { get; set; }
    }
}
