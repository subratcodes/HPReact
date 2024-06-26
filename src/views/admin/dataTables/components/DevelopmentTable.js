/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import DevelopmentTableMenu from "./DevelopmentTableMenu";
import { useEffect, useState } from "react";
import SpinnerTable from "./SpinnerTable";



function serviceMock(){

  return new Promise((res,rej)=>{
     setTimeout(()=>{
      res(3);
     },2000)
  })
}

function serviceMockFail(){

  return new Promise((res,rej)=>{
    setTimeout(()=>{
      rej("HTTP error")
    },200)
  },)

}


export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const[error,setError]=useState({value:true,message:null});
  const[load,setLoad]=useState(true);


  async function apiMockFailure(){
    try {

     await serviceMockFail();
      
    } catch (error) {
      setError({value:true,message:error.message})

      setTimeout(()=>{
        setError({value:false,message:''});
      },2000)

    }
  
 }

   
  function mockAPICall(){

    setLoad(true);

    serviceMock().then((res)=>{
      console.log(res);
      setLoad(false);
    })

  }


  useEffect(()=>{
    mockAPICall();

  },[])

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "black");
  const iconColor = useColorModeValue("secondaryGray.500", "black");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

 
 return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>

      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Development Table
        </Text>

        <DevelopmentTableMenu reload={mockAPICall} mockAPIFail={apiMockFailure}  />

      </Flex>

      {load?<SpinnerTable></SpinnerTable>:
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            
            
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  {/* table component */}
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='black.400'>
                    {column.render("Header")}
                  </Flex>


                </Th>
              ))}
            </Tr>


          ))}
        </Thead>


        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TECH") {
                    data = (
                      <Flex align='center'>
                        {cell.value.map((item, key) => {
                          if (item === "apple") {
                            return (
                              <AppleLogo
                                key={key}
                                color={iconColor}
                                me='16px'
                                h='18px'
                                w='15px'
                              />
                            );
                          } else if (item === "android") {
                            return (
                              <AndroidLogo
                                key={key}
                                color={iconColor}
                                me='16px'
                                h='18px'
                                w='16px'
                              />
                            );
                          } else if (item === "windows") {
                            return (
                              <WindowsLogo
                                key={key}
                                color={iconColor}
                                h='18px'
                                w='19px'
                              />
                            );
                          }
                        })}
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PROGRESS") {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
                          {cell.value}%
                        </Text>
                        <Progress
                          variant='table'
                          colorScheme='brandScheme'
                          h='8px'
                          w='63px'
                          value={cell.value}
                        />
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>}


    </Card>
  );
}
