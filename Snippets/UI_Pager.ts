import { UIComponent, View, Text, Pressable, Binding, UINode } from 'horizon/ui';
import { Color } from 'horizon/core';

class PagerUI extends UIComponent<typeof PagerUI> {
  private showView = new Binding(false);

  // Field variable for current page index
  private _currentPageIndex = 0;

  // Binding that reflects the field variable
  private currentPageIndex = new Binding(this._currentPageIndex);

  // Array of page content (could be replaced with actual content)
  private pages = [
    { title: "Page 1", content: "This is the first page content" },
    { title: "Page 2", content: "This is the second page content" },
    { title: "Page 3", content: "This is the third page content" },
    { title: "Page 4", content: "This is the fourth page content" }
  ];

  // Methods to navigate between pages
  private goToNextPage() {
    if (this._currentPageIndex < this.pages.length - 1) {
      this._currentPageIndex++;
      this.currentPageIndex.set(this._currentPageIndex);
    }
  }

  private goToPreviousPage() {
    if (this._currentPageIndex > 0) {
      this._currentPageIndex--;
      this.currentPageIndex.set(this._currentPageIndex);
    }
  }

  preStart() {}

  start() {}

  initializeUI() {
    return View({
      children: [
        UINode.if(
          this.showView,
          this.pagerView(),
          this.openButtonView()
        )
      ],
      style: {
        flex: 1
      }
    });
  }

  openButtonView() {
    return View({
      children: [
        Pressable({
          children: Text({
            text: "Click here to open",
            style: {
              color: 'black',
              textAlign: 'center',
              padding: 10
            }
          }),
          onClick: () => {
            this.showView.set(true);
          },
          style: {
            backgroundColor: Color.green,
            height: 40,
            borderRadius: 5
          }
        })
      ],
      style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    });
  }

  pagerView() {
    // Container for the pager
    return View({
      style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      children: [
        View({
        style: {
          width: '50%',
          height: '50%',
          backgroundColor: Color.white,
          padding: 20,
        },
        children: [
          // Title section
          View({
            style: {
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            children: [
              Text({
                text: "Pager Component",
                style: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: Color.black
                }
              }),
              Pressable({
                children: Text({
                  text: "Close",
                  style: {
                    color: 'black',
                    textAlign: 'center',
                    padding: 10
                  }
                }),
                onClick: () => {
                  this.showView.set(false);
                },
                style: {
                  backgroundColor: Color.red,
                  width: 120,
                  height: 40,
                  borderRadius: 5
                }
              })
            ]
          }),

          // Current page content
          View({
            style: {
              flex: 1,
              backgroundColor: new Color(0.95, 0.95, 0.95),
              padding: 20,
              borderRadius: 10,
              marginBottom: 20
            },
            children: [
              // Page title
              Text({
                text: this.currentPageIndex.derive((index) => {
                  return this.pages[index].title;
                }),
                style: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  color: Color.black
                }
              }),

              // Page content
              Text({
                text: this.currentPageIndex.derive((index) => {
                  return this.pages[index].content;
                }),
                style: {
                  color: Color.black
                }
              }),
            ]
          }),

          // Navigation controls
          View({
            style: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            },
            children: [
              // Previous button
              Pressable({
                children: Text({
                  text: "< Previous",
                  style: {
                    color: 'black',
                    textAlign: 'center',
                    padding: 10
                  }
                }),
                onClick: () => {
                  this.goToPreviousPage();
                },
                style: {
                  backgroundColor: this.currentPageIndex.derive((index) => {
                    return index > 0 ? Color.green : new Color(0.8, 0.8, 0.8);
                  }),
                  width: 120,
                  height: 40,
                  borderRadius: 5
                }
              }),

              // Page indicator
              Text({
                text: this.currentPageIndex.derive((index) => {
                  return `${index + 1}/${this.pages.length}`;
                }),
                style: {
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold'
                }
              }),

              // Next button
              Pressable({
                children: Text({
                  text: "Next >",
                  style: {
                    color: 'black',
                    textAlign: 'center',
                    padding: 10
                  }
                }),
                onClick: () => {
                  this.goToNextPage();
                },
                style: {
                  backgroundColor: this.currentPageIndex.derive((index) => {
                    return index < this.pages.length - 1 ? Color.green : new Color(0.8, 0.8, 0.8);
                  }),
                  width: 120,
                  height: 40,
                  borderRadius: 5
                }
              })
            ]
          })
        ]
      })
      ]
    });
  }
}
UIComponent.register(PagerUI);