using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XAdminEmailApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return File(Server.MapPath("~/Content/frontend/index.html"), "text/html");
        }
    }
}