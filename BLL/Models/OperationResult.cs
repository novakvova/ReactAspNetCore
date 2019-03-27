namespace WebSiteCore.BLL.Models
{
    public class OperationResult<T>
    {
        public T Data { get; set; }

        public bool IsSuccessful { get; set; }

        public string Message { get; set; }
    }
}
