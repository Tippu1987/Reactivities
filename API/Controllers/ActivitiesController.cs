using Microsoft.AspNetCore.Mvc;
using Persistence;
using System;
using System.Collections.Generic;
using Domain;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController:BaseAPIController
    {
        private readonly DataContext dataContext;
        public ActivitiesController(DataContext context)
        {
            dataContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await dataContext.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await dataContext.Activities.FindAsync(id);
        }
    }
}
