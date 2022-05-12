import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
//import './App.css';
import { GetServerSideProps } from "next";
import { resetServerContext } from "react-beautiful-dnd";
//import { DndWrapper } from "../../components/DndWrapper";
//import { renderToString } from 'react-dom/server';

//resetServerContext();

function dragtest({ data }) {

    

    const finalSpaceCharacters = [
        {
          id: 'gary',
          name: 'Gary Goodspeed'
        },
        {
          id: 'cato',
          name: 'Little Cato'
        },
        {
          id: 'kvn',
          name: 'KVN'
        },
        {
          id: 'mooncake',
          name: 'Mooncake'
        },
        {
          id: 'quinn',
          name: 'Quinn Ergon'
        }
      ]
    
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  console.log(characters)


  //drag後の順番入れ替え
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div >
      <header >
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
            //   <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
            <ul  {...provided.droppableProps} ref={provided.innerRef}>

                {characters.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
     
    </div>
  );
}

export default dragtest;


// export const getServerSideProps = async ({ query }) => {
//     resetServerContext();
//     return {props: { data : []}}
// }

// export async function getServerSideProps(context) {
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }

export const getServerSideProps = async ({ query }) => {
    resetServerContext();

    return {props: { data : []}}
}
