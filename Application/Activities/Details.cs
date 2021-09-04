using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext datacontext)
            {
                dataContext = datacontext;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await dataContext.Activities.FindAsync(request.Id);
            }
        }
    }
}