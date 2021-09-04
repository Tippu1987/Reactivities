using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext _dataContext)
            {
                dataContext = _dataContext;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await dataContext.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}