using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class WorkRequestDB
    {
        [Key]
        public int id { get; set; }

        public string BasicInfoId { get; set; }

        public string HystoryOfChangesId { get; set; }

        public string MultimediaId { get; set; }

        public string EquipmentId { get; set; }
    }
}
