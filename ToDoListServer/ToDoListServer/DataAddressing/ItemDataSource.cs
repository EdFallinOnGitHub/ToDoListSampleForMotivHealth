
using Microsoft.EntityFrameworkCore;

namespace ToDoListServer;

public class ItemDataSource : DbContext {
    // File in folder relative to project root.
    // Non-POSIX path syntax even in POSIX OS.
    protected string CONNECTION_STRING = @"DataSource=Data\items.db";

    public DbSet<Item> Items { get; set; }

    public ItemDataSource() {
        Init();
    }
    
    protected virtual void Init() {
        // Created, but not first destroyed,
        // for real-data persistence.
        // Database.EnsureDeleted();  /* &> remove later? */
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder builder) {
        builder.UseSqlite(CONNECTION_STRING);
    }
}