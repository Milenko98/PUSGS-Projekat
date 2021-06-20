using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PUSGSVeb2.Models;

namespace PUSGSVeb2.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    [ApiController]
    public class WorkRequestController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public WorkRequestController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("AddWorkRequest")]
        public async Task<ActionResult<WorkRequest>> AddWorkRequest(WorkRequest wr)
        {
            //Dodavanje BasicInfo-a u bazu
            WorkRequestBasicInfo wrb = new WorkRequestBasicInfo();
            wrb = wr.basicinfo;
            if (wrb != null)
            {
                _context.BasicInfos.Add(wrb);
                await _context.SaveChangesAsync();
            }

            //Dodavanje HystoryOfChanges-a u bazu
            if (wr.historyofchanges.Count() != 0 && wr.historyofchanges != null)
            {
                foreach (var item in wr.historyofchanges)
                {
                    item.BasicInfoId = wr.basicinfo.idd;
                }
                _context.HystoryOfChanges.AddRange(wr.historyofchanges);
                await _context.SaveChangesAsync();
            }

            //Dodavanje multimedije u bazu
            if (wr.multimedia.Count() != 0 && wr.multimedia != null)
            {
                foreach (var item in wr.multimedia)
                {
                    item.BasicInfoId = wr.basicinfo.idd;
                }
                _context.Multimedia.AddRange(wr.multimedia);
                await _context.SaveChangesAsync();
            }

            //Dodavanje equipmenta u bazu
            if (wr.equipments.Count() != 0 && wr.equipments != null)
            {
                foreach (var item in wr.equipments)
                {
                    item.BasicInfoId = wr.basicinfo.idd;
                }
                _context.Equipments.AddRange(wr.equipments);
                await _context.SaveChangesAsync();
            }

            _context.WorkRequests.Add(wr);

            await _context.SaveChangesAsync();

            var result = _context.Entry(wr).Entity;

            return Ok(result);
        }

        [HttpPost]
        [Route("ChangeBasicInfo/{id}")]
        public async Task<ActionResult<WorkRequest>> ChangeBasicInfo(WorkRequestBasicInfo wr, int id)
        {
            var bi = await _context.BasicInfos.FirstAsync(e => e.idd == wr.idd);

            if (bi != null)
            {
                _context.BasicInfos.Remove(bi);
                wr.id = bi.id;
                _context.BasicInfos.Add(wr);
                await _context.SaveChangesAsync();
                return Ok(bi);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("GetBasicInfo")]
        public async Task<ActionResult<IEnumerable<WorkRequestBasicInfo>>> GetBasicInfo()
        {
            return await _context.BasicInfos.ToListAsync();
        }

        [HttpGet]
        [Route("GetHystoryOfChanges")]
        public async Task<ActionResult<IEnumerable<WorkRequestHistoryOfChanges>>> GetHystoryOfChanges()
        {
            return await _context.HystoryOfChanges.ToListAsync();
        }

        [HttpGet]
        [Route("GetMultimedia")]
        public async Task<ActionResult<IEnumerable<WorkRequestMultimedia>>> GetMultimedia()
        {
            return await _context.Multimedia.ToListAsync();
        }

        [HttpGet]
        [Route("GetEquipments")]
        public async Task<ActionResult<IEnumerable<WorkRequestEquipments>>> GetEquipments()
        {
            return await _context.Equipments.ToListAsync();
        }

        [HttpGet]
        [Route("GetBasicInfoId/{id}")]
        public async Task<ActionResult<WorkRequestBasicInfo>> GetBasicInfoId(int id)
        {
            var bi = await _context.BasicInfos.FirstAsync(e => e.idd == id);
            //var bi = await _context.BasicInfos.FindAsync(id);

            if (bi == null)
            {
                return NotFound();
            }

            return bi;
        }

        [HttpGet]
        [Route("GetHystoryId/{id}")]
        public async Task<ActionResult<WorkRequestHistoryOfChanges>> GetHystoryId(int id)
        {
            var bi = await _context.HystoryOfChanges.FirstAsync(e => e.idd == id);
            //var bi = await _context.BasicInfos.FindAsync(id);

            if (bi == null)
            {
                return NotFound();
            }

            return bi;
        }

        [HttpGet]
        [Route("GetWorkRequestForUpdate/{id}")]
        public async Task<ActionResult<WorkRequest>> GetWorkRequestForUpdate(int id)
        {
            WorkRequestBasicInfo wrbi = new WorkRequestBasicInfo();
            List<WorkRequestHistoryOfChanges> wrh = new List<WorkRequestHistoryOfChanges>();
            List<WorkRequestMultimedia> wrm = new List<WorkRequestMultimedia>();
            List<WorkRequestEquipments> wre = new List<WorkRequestEquipments>();
            WorkRequest wr = new WorkRequest();
            wr.historyofchanges = new List<WorkRequestHistoryOfChanges>();
            wr.multimedia = new List<WorkRequestMultimedia>();
            wr.equipments = new List<WorkRequestEquipments>();

            if (_context.WorkRequests.FirstAsync(e => e.id == id) == null)
            {
                return NotFound();
            }

            wrbi = await _context.BasicInfos.FirstAsync(e => e.idd == id);
            wrh = await _context.HystoryOfChanges.Where(e => e.BasicInfoId == id).ToListAsync();
            wre = await _context.Equipments.Where(e => e.BasicInfoId == id).ToListAsync();

            wr.basicinfo = wrbi;
            if (wrh.Count != 0 && wrh != null)
            {
                foreach (var item in wrh)
                {
                    wr.historyofchanges.Add(item);
                }
            }

            if (wre != null && wre.Count != 0)
            {
                foreach (var item in wre)
                {
                    wr.equipments.Add(item);
                }
            }

            if (wrm != null && wrm.Count != 0)
            {
                foreach (var item in wrm)
                {
                    wr.multimedia.Add(item);
                }
            }

            return Ok(wr);
        }

        [HttpPost]
        [Route("UpdateWorkRequest/{id}")]
        public async Task<ActionResult<WorkRequest>> UpdateWorkRequest(WorkRequest wr, int id)
        {
            if (wr == null)
            {
                return BadRequest();
            }

            WorkRequestBasicInfo wrbi = new WorkRequestBasicInfo();
            List<WorkRequestHistoryOfChanges> wrh = new List<WorkRequestHistoryOfChanges>();
            List<WorkRequestMultimedia> wrm = new List<WorkRequestMultimedia>();
            List<WorkRequestEquipments> wre = new List<WorkRequestEquipments>();
            WorkRequest wrr = new WorkRequest();
            wr.historyofchanges = new List<WorkRequestHistoryOfChanges>();
            wr.multimedia = new List<WorkRequestMultimedia>();
            wr.equipments = new List<WorkRequestEquipments>();

            wrbi = await _context.BasicInfos.FirstAsync(e => e.idd == id);
            wrh = await _context.HystoryOfChanges.Where(e => e.BasicInfoId == id).ToListAsync();
            wre = await _context.Equipments.Where(e => e.BasicInfoId == id).ToListAsync();

            if (wrbi != null)
            {
                _context.BasicInfos.Remove(wrbi);
                wrbi.idd = id;
                _context.BasicInfos.Add(wr.basicinfo);
                await _context.SaveChangesAsync();
            }

            if (wr.historyofchanges.Count != 0 && wr.historyofchanges != null)
            {
                if (wrh.Count != 0 && wrh != null)
                {
                    _context.HystoryOfChanges.RemoveRange(wrh);
                    _context.HystoryOfChanges.AddRange(wr.historyofchanges);
                    await _context.SaveChangesAsync();
                }
            }

            if (wr.equipments.Count != 0 && wr.equipments != null)
            {
                if (wre.Count != 0 && wr != null)
                {
                    _context.Equipments.RemoveRange(wre);
                    _context.Equipments.AddRange(wr.equipments);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok("ok");
        }

        [HttpPost]
        [Route("AddHistory")]
        public async Task<ActionResult<WorkRequest>>AddHistory(WorkRequestHistoryOfChanges his)
        {
            //WorkRequest wr = new WorkRequest();
            //List<WorkRequestHistoryOfChanges> wrh = new List<WorkRequestHistoryOfChanges>();

            //wr = await _context.WorkRequests.FirstAsync(e => e.id == his.BasicInfoId);
            //wr.historyofchanges.Add(his);
            //await _context.SaveChangesAsync();
            //if (wr != null)
            //{
            //    foreach (var item in wr.historyofchanges)
            //    {
            //        wrh.Add(item);
            //    }
            //}
            his.idd = 0;
            try
            {
                await _context.HystoryOfChanges.AddAsync(his);
                await _context.SaveChangesAsync();
                
            }
              catch(Exception e)
            {
                string s = e.Message;
            }
            return Ok(his);
        }
    }
}