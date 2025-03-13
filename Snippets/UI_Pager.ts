import * as hzui from 'horizon/ui';
import * as hz from 'horizon/core';

export class PagerUI extends hzui.UIComponent<typeof PagerUI> {
  private showView = new hzui.Binding(false);

  // Field variable for current page index
  private _currentPageIndex = 0;

  // Binding that reflects the field variable
  private currentPageIndex = new hzui.Binding(this._currentPageIndex);

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

  initializeUI() {
    return hzui.View({
      children: [
        hzui.UINode.if(
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
    return hzui.View({
      children: [
        hzui.Pressable({
          children: hzui.Text({
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
            backgroundColor: hz.Color.green,
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
    return hzui.View({
      style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      children: [
        hzui.View({
        style: {
          width: '50%',
          height: '50%',
          backgroundColor: hz.Color.white,
          padding: 20,
        },
        children: [
          // Title section
          hzui.View({
            style: {
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            children: [
              hzui.Text({
                text: "Pager Component",
                style: {
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: hz.Color.black
                }
              }),
              hzui.Pressable({
                children: hzui.Text({
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
                  backgroundColor: hz.Color.red,
                  width: 120,
                  height: 40,
                  borderRadius: 5
                }
              })
            ]
          }),

          // Current page content
          hzui.View({
            style: {
              flex: 1,
              backgroundColor: new hz.Color(0.95, 0.95, 0.95),
              padding: 20,
              borderRadius: 10,
              marginBottom: 20
            },
            children: [
              // Page title
              hzui.Text({
                text: this.currentPageIndex.derive((index) => {
                  return this.pages[index].title;
                }),
                style: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  color: hz.Color.black
                }
              }),

              // Page content
              hzui.Text({
                text: this.currentPageIndex.derive((index) => {
                  return this.pages[index].content;
                }),
                style: {
                  color: hz.Color.black
                }
              }),
            ]
          }),

          // Navigation controls
          hzui.View({
            style: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            },
            children: [
              // Previous button
              hzui.Pressable({
                children: hzui.Text({
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
                    return index > 0 ? hz.Color.green : new hz.Color(0.8, 0.8, 0.8);
                  }),
                  width: 120,
                  height: 40,
                  borderRadius: 5
                }
              }),

              // Page indicator
              hzui.Text({
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
              hzui.Pressable({
                children: hzui.Text({
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
                    return index < this.pages.length - 1 ? hz.Color.green : new hz.Color(0.8, 0.8, 0.8);
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
hzui.UIComponent.register(PagerUI);