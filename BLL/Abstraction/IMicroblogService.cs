using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebSiteCore.BLL.Models;

namespace WebSiteCore.BLL.Abstraction
{
    public interface IMicroblogService
    {
        Task<OperationResult<MicroblogPublicModel>> CreatePost(MicroblogEditModel model);
        Task<OperationResult<List<MicroblogPublicModel>>> Search();
    }
}
