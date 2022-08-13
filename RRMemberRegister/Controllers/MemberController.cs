using MemberRegister.Models;
using MemberRegister.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace MemberRegisterAngular.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBaseController//ControllerBase
    {
        private readonly IMemberRegisterService m_MemberRegisterService;

        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="service"></param>
        public MemberController(IMemberRegisterService service)
        {
            this.m_MemberRegisterService = service;
        }

        /// <summary>
        /// GET: api/Member
        /// Hämta alla medlemmar
        /// </summary>
        /// <returns>Ok och lista med alla medlemmar</returns>
        [HttpGet]
        public IActionResult Get()
        {
            List<Member> lsMembers = this.m_MemberRegisterService.GetMembers();

            return Ok(lsMembers);
        }

        /// <summary>
        /// GET: api/Member/5
        /// Hämtar sökt medlem
        /// </summary>
        /// <param name="id">id frö sökt medlem</param>
        /// <returns>Ok och sökt medlem ellet NotFound</returns>
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            try
            {
                Member member = this.m_MemberRegisterService.GetMember(id);

                if (member != null)
                    return Ok(member);
            }
            catch (Exception) 
            { }

            return NotFound();
        }

        /// <summary>
        /// POST: api/Member
        /// Skapar en ny medlem
        /// </summary>
        /// <param name="member">Information om nya medlemen</param>
        /// <returns>Om det gick att skapa medlemen returneras medlemens id annars returneras -1</returns>
        [HttpPost]
        public int Post([FromBody] Member member)
        {
            int iReturnValue = -1;

            try
            {
                // returnera id. -1 vid fel
                Member mem = this.m_MemberRegisterService.CreateMember(member);
                if (mem != null)
                    iReturnValue = mem.Id;
            }
            catch (Exception)
            { }

            return iReturnValue;

        }

        /// <summary>
        /// PUT: api/Member/5       
        /// EDIT
        /// Uppdaterar informationen om en medlem
        /// </summary>
        /// <param name="id">Id för den medlem som skall uppdateras</param>
        /// <param name="member">Information om medlemen</param>
        /// <returns>Om det gick att uppdatera information om medlemen returneras medlemens id annars returneras -1</returns>
        [HttpPut("{id}")]
        public int Put(int id, [FromBody] Member member)
        {
            int iReturnValue = -1;

            try
            {
                // returnera id. -1 vid fel
                iReturnValue = this.m_MemberRegisterService.UpdateMember(member);
            }
            catch(Exception exc)
            { }

            return iReturnValue;
        }

        /// <summary>
        /// DELETE: api/Member/5
        /// Raderar en medlem
        /// </summary>
        /// <param name="id">id för den medlem som skall raderas</param>
        /// <returns>Om det gick att uppdatera information om medlemen returneras medlemens id annars returneras -1</returns>
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            int iReturnValue = -1;

            try
            {
                // returnera id. -1 vid fel
                iReturnValue = this.m_MemberRegisterService.DeleteMember(id);
            }
            catch(Exception)
            { }

            return iReturnValue;
        }
    }
}