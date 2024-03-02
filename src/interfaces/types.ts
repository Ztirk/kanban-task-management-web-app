export interface BoardNames {
  Count: number;
  Items: {
    board_id: {
      S: string;
    };
    board_name: {
      S: string;
    };
  }[];
}

export interface BoardDetails {
  Item: {
    board_id: {
      S: string;
    };
    board_name: {
      S: string;
    };
    column: {
      L: {
        M: {
          column_id: {
            S: string;
          };
          column_name: {
            S: string;
          };
          task: {
            L: {
              M: {
                task_id: {
                  S: string;
                };
                task_name: {
                  S: string;
                };
                description: {
                  S: string;
                };
                sub_task: {
                  L: {
                    M: {
                      sub_task_id: {
                        S: string;
                      };
                      sub_task_name: {
                        S: string;
                      };
                      achieved: {
                        BOOL: boolean;
                      };
                    };
                  }[];
                };
              };
            }[];
          };
        };
      }[];
    };
  };
}

export interface BackDropT {
  active: boolean;
  onCancel: () => void;
}

export interface NewBoardT {
  board_id: string;
  board_name: string;
  column: { column_id: string; column_name: string }[];
}
