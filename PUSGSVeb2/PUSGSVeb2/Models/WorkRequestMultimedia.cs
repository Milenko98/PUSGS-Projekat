using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVeb2.Models
{
    public class WorkRequestMultimedia
    {
        [Key]
        public int idd { get; set; }

        public int BasicInfoId { get; set; }

        public string filename { get; set; }

    }
}
