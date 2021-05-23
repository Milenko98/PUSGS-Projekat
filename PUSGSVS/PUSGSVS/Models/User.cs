using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PUSGSVS.Models
{
  [Table("User")]
  public class User
  {
    
    [Required]
    public string Ime
    {
      get { return Ime; }
      set { Ime = value; }
    }

    [Required]
    public string Prezime { get; set; }
  }
}
