using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ToDoListServer;

public class Item : IEquatable<Item> {
    [Key] public int UID { get; set; }
    public int Order { get; set; }
    public string Task { get; set; }
    public bool Completed { get; set; }

    #region Constructors

    /* Explicit parameter constructor needed for DbContext, etc. */
    public Item() {
        /* No operations. */
    }

    /* Common constructor. */
    public Item(int uid, int order, string task, bool completed) {
        UID = uid;
        Order = order;
        Task = task;
        Completed = completed;
    }

    /* Copy constructor. */
    public Item(Item source) : this(source.UID, source.Order, source.Task, source.Completed) {
        /* No additional operations. */
    }

    #endregion Constructors

    /* Turn this Item into a by-values copy of another Item,
       and return it for any "fluent" / functional usage. */
    public Item Adopt(Item original) {
        this.UID = original.UID;
        this.Order = original.Order;
        this.Task = original.Task;
        this.Completed = original.Completed;

        return this;
    }

    #region IEquatable

    /* Needed primarily for tests at present. */

    /* Verified in tests, but not tested themselves,
       because IDE-generated, with format-only edits. */

    public bool Equals(Item? other) {
        // Early exits.
        if (other is null) {
            return false;
        }

        if (ReferenceEquals(this, other)) {
            return true;
        }

        // Value comparison.
        return UID == other.UID
               && Order == other.Order
               && Task == other.Task
               && Completed == other.Completed;
    }

    public override bool Equals(object? obj) {
        // Early exits.
        if (obj is null) {
            return false;
        }

        if (ReferenceEquals(this, obj)) {
            return true;
        }

        if (obj.GetType() != GetType()) {
            return false;
        }

        // Actual comparison.
        return Equals((Item)obj);
    }

    public override int GetHashCode() {
        return HashCode.Combine(UID, Order, Task, Completed);
    }

    #endregion IEquatable
}