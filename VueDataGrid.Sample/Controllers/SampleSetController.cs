using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData;

namespace VueDataGrid.Sample.Controllers
{
	public class SampleSetController : ODataController
	{
		[EnableQuery]
		public IQueryable<SampleItem> Get() => new[]
		{
			new SampleItem { Id = 1, Name = "Pencil", Price = 1.32m, Release = DateTime.Parse("2019-01-10 13:45:33") },
			new SampleItem { Id = 2, Name = "Car", Price = 112312, Release = DateTime.Parse("2019-02-10 13:45:33") },
			new SampleItem { Id = 3, Name = "Game", Price = 59.99m, Release = DateTime.Parse("2019-02-20 13:45:33") },
			new SampleItem { Id = 4, Name = "Car", Price = 4459.99m, Release = DateTime.Parse("2019-01-18 13:45:33") },
		}.AsQueryable();
	}

	public class SampleItem
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public DateTime Release { get; set; }
	}
}