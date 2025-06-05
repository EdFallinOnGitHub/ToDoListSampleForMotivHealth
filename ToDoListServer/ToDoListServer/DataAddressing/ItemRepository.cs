using System.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore.Sqlite;

namespace ToDoListServer;

public class ItemRepository {
    ItemDataSource source;

    public ItemRepository(ItemDataSource source) {
        this.source = source;
    }

    /* Not truly async, but kept consistent. */
    public async Task<IEnumerable<Item>> GetAllAsync() /* p */ {
        IEnumerable<Item> output = this.source.Items
            .OrderBy(x => x.Order);

        return output;
    }

    public async Task<Item> AddNewAsync(Item item) /* p */ {
        // Not available before now.
        item.Order = this.HighestOrder() + 1;

        // Actually adding.
        this.source.Add(item);
        await this.source.SaveChangesAsync();

        // Returning with .UID and .Order.
        // Last() just in case 2+ of .Task.
        Item output = this.source
            .Items
            .OrderBy(x => x.UID)  // Same as stored order.
            .Last(x => x.Task == item.Task);

        return output;
    }

    public async Task ChangeExistingAsync(Item item) /* p */ {
        Item existing = await this.source.Items.FindAsync(item.UID);
        existing.Adopt(item);
        await this.source.SaveChangesAsync();
    }

    public async Task DeleteExistingAsync(int uid) /* p */ {
        Item target = await this.source.Items.FindAsync(uid);
        this.source.Remove(target);
        await this.source.SaveChangesAsync();
    }

    #region Internals

    private int HighestOrder() /* v */ {
        // First new Item only.
        if (this.source.Items.Count() == 0) { return 0; }

        // All other Items.
        int output = this.source.Items.Max(x => x.Order);
        return output;
    }

    #endregion Internals
}