using Microsoft.AspNetCore.Mvc;

namespace ToDoListServer;

[ApiController]
[Route("items")]
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
    public async Task<ActionResult<IEnumerable<Item>>> GetAllItemsAsync() {
        List<Item> items = await Task.FromResult(fakes);
        return Ok(items);
    }

    [HttpPost("")]
    public async Task<ActionResult> PostNewItemAsync(NewItem added) {
        int next = fakes.Count + 1;
        Item item = new(next, next, added.Task, false);
        fakes.Add(item);

        // Request URL properties all include trailing "/". 
        string url = $"{Request.Scheme}://{Request.Host}{Request.Path}{item.UID}";

        return Created(url, item);
    }
    
    [HttpPut("")]
    public async Task<ActionResult> PutChangedItemAsync(Item changed) {
        int target = fakes.FindIndex(x => x.UID == changed.UID);
        fakes[target] = changed;
        Console.WriteLine(fakes);
        return NoContent();
    }
    
    [HttpDelete("{uid}")]
    public async Task<ActionResult> DeleteItemAsync(int uid) {
        int target = fakes.FindIndex(x => x.UID == uid);
        fakes.RemoveAt(target);
        Console.WriteLine(fakes);
        return NoContent();
    }
}