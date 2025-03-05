"use client";

import { useEffect, useState, useTransition } from "react";
import { TextField, Typography, List, ListItem, Avatar, CircularProgress, Box } from "@mui/material";
import { searchUsers } from "@/app/actions/users"; // Import serverovej akcie

// Opravený typ User – podporuje `null` hodnoty z Prisma
interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]); // Použitie User[]
  const [isPending, startTransition] = useTransition();

  // Načítanie všetkých používateľov pri prvom načítaní stránky
  useEffect(() => {
    startTransition(async () => {
      const result = await searchUsers("");
      setUsers(result);
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(async () => {
      const result = await searchUsers(value);
      setUsers(result);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>Vyhľadávanie</Typography>
      <TextField
        fullWidth
        label="Hľadať používateľa"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        sx={{ maxWidth: 500, marginBottom: 3 }}
      />
      {isPending && <CircularProgress style={{ marginBottom: 20 }} />}
      
      {/* Zoznam používateľov bez scrollovania */}
      <List sx={{ width: "100%", maxWidth: 500 }}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Avatar src={user.image || ""} />
            <Typography style={{ marginLeft: 10 }}>{user.name ?? user.email}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
