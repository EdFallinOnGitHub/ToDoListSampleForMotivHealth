using Microsoft.AspNetCore.Mvc;

namespace ToDoListServer;

[ApiController]
[Route("[controller]")]
public class ItemController : ControllerBase {
  private List<Item> fakes = new() {
    new Item(1, 1, "Task A1", false),
    new Item(2, 2, "Task B2", false),
    new Item(3, 3, "Task C3", false),
    new Item(4, 4, "Task D4", false),
    new Item(5, 5, "Task E5", false)
  };

  private readonly ILogger<ItemController> _logger;

  public ItemController(ILogger<ItemController> logger) {
    _logger = logger;
  }

  [HttpGet("")]
  public async Task<ActionResult<IEnumerable<Item>>> GetAsync() {
      List<Item> items = await Task.FromResult(fakes);
      return Ok(items);
  }
}
