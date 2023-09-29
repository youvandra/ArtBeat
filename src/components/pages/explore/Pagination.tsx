import { ActionIcon, createStyles, Group } from "@mantine/core";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
const useStyles = createStyles((t) => ({
  filters: {
    [t.fn.smallerThan("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
}));

export default function Pagination({
  active,
  pageCount,
  onPageChange, // Tambahkan prop onPageChange untuk menangani perubahan halaman
}: {
  active: number;
  pageCount: number;
  onPageChange: (newPage: number) => void; // Tambahkan definisi prop onPageChange
}) {
  const { classes } = useStyles();

  // Generate array of page numbers from 1 to pageCount
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <Group noWrap align={"start"} spacing={"sm"}>
      <ActionIcon
        variant="transparent"
        color={"#034239"}
        size="md"
        onClick={() => onPageChange(active - 1)} // Menangani klik ke halaman sebelumnya
        disabled={active === 1} // Men-disable tombol jika sudah di halaman pertama
      >
        <MdArrowBack size={24} />
      </ActionIcon>
      <Group spacing={"xs"}>
        {pageNumbers.map((pageNumber) => (
          <ActionIcon
            key={pageNumber}
            variant={pageNumber === active ? "filled" : "outline"} // Mengecek apakah nomor halaman aktif atau tidak
            color={"#034239"}
            size="md"
            onClick={() => onPageChange(pageNumber)} // Menangani klik pada nomor halaman
          >
            {pageNumber}
          </ActionIcon>
        ))}
      </Group>
      <ActionIcon
        variant="transparent"
        color={"#034239"}
        size="md"
        onClick={() => onPageChange(active + 1)} // Menangani klik ke halaman berikutnya
        disabled={active === pageCount} // Men-disable tombol jika sudah di halaman terakhir
      >
        <MdArrowForward size={24} />
      </ActionIcon>
    </Group>
  );
}
