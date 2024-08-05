import RoomPlanning from "@/components/Planning";

const events = [
    {
      title: 'Réunion Chambre 101',
      start: '2024-07-23',
      end: '2024-07-28',
      resourceId: '101'
    },
    {
      title: 'Présentation Chambre 102',
      start: '2024-07-30',
      end: '2024-07-30',
      resourceId: '102'
    }
  ];
export default function Test() {
    return (
        <div>
            <RoomPlanning events={events}/>
        </div>
    )
}



Test.getLayout = function getLayout(page) {
    return(
        <>
            {page}
        </>
    );
}