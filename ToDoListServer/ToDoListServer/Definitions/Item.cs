namespace ToDoListServer;

public class Item {
  public int Order { get; set; }
  public int UID { get; set; }
  public string Task { get; set; }
  public bool Completed { get; set; }

  public Item(int uid, int order, string task, bool completed) {
    UID = uid;
    Order = order;
    Task = task;
    Completed = completed;
  }

  public Item(Item source) : this(source.UID, source.Order, source.Task, source.Completed) {
    /* No additional operations. */
  }
}
