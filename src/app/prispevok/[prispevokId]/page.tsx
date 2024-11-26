// src/app/prispevok/[id]/page.tsx

import Typography from '@mui/material/Typography';

export const metadata = {title: "Detail konkrétneho príspevku | Zoska"}

export default function PostDetail({ 
  params, 
}: {
  params: { prispevokId: string };
}) {
  
  return ( 
      
      <Typography> Detail konkrétneho príspevku číslo {params.prispevokId} </Typography>
      
  );
}