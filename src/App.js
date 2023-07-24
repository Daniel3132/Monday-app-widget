import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import TokenManagerService from "./services/TokenManagerService";

const monday = mondaySdk();
const tokenManager = new TokenManagerService(monday);

const App = () => {
  const [board, setBoardId] = useState();
  const [columns, setColumns] = useState([]);
  const [items, setItems] = useState([]);

  const getBoardId = () => {
    monday.api(`query {
        boards {
          id
          name
        }
      }`)
      .then((res) => {
        const boardID = res?.data?.boards[0].id;
        setBoardId(boardID);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  };

  const getColumns = () => {
    monday.api(`query {
      boards(ids: ${board}) {
        columns {
          id
          title
          type
        }
      }
    }`)
      .then((res) => {
        const board = res.data?.boards[0];
        setColumns(board.columns);
      })
      .catch((error) => {
        console.error("Error fetching columns:", error);
      });
  };

  const getItems = () => {
    monday.api(`query {
      boards(ids: ${board}) {
        items {
          id
          name
          column_values {
            id
            title
            value
          }
        }
      }
    }`)
      .then((res) => {
        const items = res.data?.boards[0].items;
        setItems(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await tokenManager.processToken();
      getBoardId();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (board) {
      getColumns();
      getItems();
    }
  }, [board]);


  return (
    <div className="App">
      <div>
        <h2>Columns:</h2>
        <ul>
          {columns.map((column) => (
            <li key={column.id}>{column.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Items:</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <ul>
                {item.column_values.map((columnValue) =>
                  columnValue.title === "Status" ? (
                    <li key={columnValue.id}>
                      {columnValue.title}: {columnValue.value}
                    </li>
                  ) : null
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
