import { UIComponent, View, ScrollView, DynamicList, Binding, UINode } from 'horizon/ui';

class DynamicAndScrollViewUI extends UIComponent<typeof DynamicAndScrollViewUI> {
  private itemListBinding: Binding<string[]> = new Binding([
    'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
    'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
    'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15',
    'Item 16', 'Item 17', 'Item 18', 'Item 19', 'Item 20'
  ]);

  start() { }

  private renderListItem = (item: string, index?: number): UINode => {
    return View({
      style: {
        width: 50,
        height: 50,
        backgroundColor: (index ?? 0) % 2 === 0 ? 'black' : 'gray',
      },
    });
  }

  public initializeUI() {
    return View({
      children: [
        ScrollView({
          children: [
            DynamicList({
              data: this.itemListBinding,
              renderItem: this.renderListItem,
              style: {
                flex: 1
              }
            })
          ],
          contentContainerStyle: {
            backgroundColor: 'lightgray',
            height: 1200,
            width: '100%'
          },
          style: {
            backgroundColor: 'white',
            flex: 1,
            padding: 10
          }
        })
      ],
      style: {
        flex: 1
      }
    });
  }

  // Method to add new items dynamically
  public addItem(newItem: string) {
    this.itemListBinding.set(currentItems => [...currentItems, newItem]);
  }

  // Method to remove items dynamically
  public removeItem(index: number) {
    this.itemListBinding.set(currentItems => {
      if (index >= 0 && index < currentItems.length) {
        return currentItems.filter((_, i) => i !== index);
      }
      return currentItems;
    });
  }
}
UIComponent.register(DynamicAndScrollViewUI);