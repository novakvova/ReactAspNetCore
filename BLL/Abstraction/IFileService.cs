using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebSiteCore.BLL.Abstraction
{
    public interface IFileService
    {
        string UploadImage(string base64);
    }
}
