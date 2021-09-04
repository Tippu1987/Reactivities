using Domain;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext ctx)
            {
                dataContext = ctx;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                dataContext.Activities.Add(request.Activity);
                await dataContext.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}