using Microsoft.AspNetCore.Mvc;

namespace ToDoListServer;

[ApiController]
[Route("items")]
public class ItemController : ControllerBase {
    ItemRepository items;

    public ItemController(ItemRepository items) {
        this.items = items;
    }

    [HttpGet("")]
    public async Task<ActionResult<IEnumerable<Item>>> GetAllItemsAsync() {
        IEnumerable<Item> output = await items.GetAllAsync();
        return Ok(output);
    }

    [HttpPost("")]
    public async Task<ActionResult> PostNewItemAsync(NewItemTask taskToAdd) {
        // .Task, some defaults, and defaults that are overwritten when saved.
        Item toAdd = new Item(0, 0, taskToAdd.Task, false);
        Item added = await items.AddNewAsync(toAdd);

        // Request URL properties all include trailing "/". 
        string url = $"{Request.Scheme}://{Request.Host}{Request.Path}{added.UID}";

        return Created(url, added);
    }
    
    [HttpPut("")]
    public async Task<ActionResult> PutChangedItemAsync(Item changed) {
        await items.ChangeExistingAsync(changed);
        return NoContent();
    }
    
    [HttpDelete("{uid}")]
    public async Task<ActionResult> DeleteItemAsync(int uid) {
        await items.DeleteExistingAsync(uid);
        return NoContent();
    }
}