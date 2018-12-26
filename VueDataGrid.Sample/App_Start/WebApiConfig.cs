using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using VueDataGrid.Sample.Controllers;

namespace VueDataGrid.Sample
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			// Web API configuration and services

			// Web API routes
			config.MapHttpAttributeRoutes();

			ODataConventionModelBuilder modelBuilder = new ODataConventionModelBuilder();
			modelBuilder.EntitySet<SampleItem>("sampleSet");
			var model = modelBuilder.GetEdmModel();
			config.Routes.MapODataServiceRoute(routeName: "OData", routePrefix: "odata", model: model);
			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);
		}
	}
}
