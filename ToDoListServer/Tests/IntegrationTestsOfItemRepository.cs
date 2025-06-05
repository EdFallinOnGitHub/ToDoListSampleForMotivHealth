using ToDoListServer;

namespace Tests;

public class IntegrationTestsOfItemRepository {
    /* These tests take the form of unit tests, but since I'm not inverting
       the dependency on the DbContext, they're really integration tests. */

    [Test]
    public async Task GetAllAsync_ReturnsAllItems() /* v/p */ {
        /* Prepare. */
        ItemDataSource source = new TestOnlyItemDataSource();
        List<Item> expected = GenerateFiveItems(source);

        /* Exercise. */
        ItemRepository target = new(source);

        /* Compare. */
        IEnumerable<Item> actual = await target.GetAllAsync();
        Assert.That(actual, Is.EqualTo(expected));
    }

    [Test]
    public async Task AddNewAsync_DoesAddItem() /* v/p */ {
        /* Prepare. */
        ItemDataSource source = new TestOnlyItemDataSource();
        GenerateFiveItems(source);
        ItemRepository target = new(source);

        // Before and after of added item.
        Item arg = new Item(0, 0, "Added Task", true);
        Item expected = new Item(6, 6, "Added Task", true);

        /* Exercise. */
        await target.AddNewAsync(arg);

        /* Compare. */
        List<Item> all = source.Items.ToList();
        Assert.That(all.Count, Is.EqualTo(6));

        Item actual = all.Find(x => x.Task == "Added Task");
        Assert.That(actual, Is.EqualTo(expected));
    }

    [Test]
    public async Task ChangeExistingAsync_DoesChangeItem() /* v/p */ {
        /* Prepare. */
        ItemDataSource source = new TestOnlyItemDataSource();
        GenerateFiveItems(source);
        ItemRepository target = new(source);

        // Existing item copied and changed.
        Item raw = source.Items.ElementAt(3);
        Item arg = new Item(raw);

        arg.Task += " " + "With Changes";
        arg.Completed = false;

        // Changed item copied for comparing.
        Item expected = new Item(arg);

        /* Exercise. */
        await target.ChangeExistingAsync(arg);

        /* Compare. */
        Item actual = source.Items.ToList().Find(x => x.UID == arg.UID);
        Assert.That(actual, Is.EqualTo(expected));
    }

    [Test]
    public async Task DeleteExistingAsync_DoesDeleteItem() /* v/p */ {
        /* Prepare. */
        ItemDataSource source = new TestOnlyItemDataSource();
        ItemRepository target = new(source);

        // Test data and expected.
        List<Item> expected = GenerateFiveItems(source);
        expected.RemoveAt(2);

        // ID of existing item to delete.
        int arg = source.Items
            .ElementAt(2)
            .UID;

        /* Exercise. */
        await target.DeleteExistingAsync(arg);

        /* Compare. */
        IEnumerable<Item> actual = source.Items;
        Assert.That(actual, Is.EqualTo(expected));
    }

    #region Fixtures

    /* Identical to ItemDataSource except for location
       and isolation / refreshing of actual database. */
    private class TestOnlyItemDataSource : ItemDataSource {
        protected override void Init() {
            CONNECTION_STRING = "DataSource=test_item.db";

            // Destroyed, then created anew
            // (in base), for test isolation.
            Database.EnsureDeleted();
            base.Init();
        }
    }

    private List<Item> GenerateFiveItems(ItemDataSource source) /* v */ {
        // Used in tests for expecteds.
        List<Item> output = new();

        // Actually generating.
        for (int at = 1; at < 6; at++) {
            char letter = (char)(at + 64);  // Capital letters.
            string task = $"Task {letter}{at}";

            Item next = new Item(at, at, task, true);

            // For both output types.
            output.Add(next);
            source.Add(next);
        }

        // Both stored and returned.
        source.SaveChanges();

        return output;
    }

    #endregion Fixtures
}