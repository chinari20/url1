import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Group,
  Text,
  Container,
  Paper,
  Center,
  Pagination,
} from "@mantine/core";
import { IconExternalLink, IconTrash } from "@tabler/icons-react";
import axios from "axios";

export default function MyURLs() {
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function fetchUrls() {
      try {
        const res = await axios.get(
          `https://url-shortener-bootcamp.onrender.com/api/user/my/urls?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        setUrls(res.data.shortURLs || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching URLs:", err);
        setUrls([]);
      }
    }
    fetchUrls();
  }, [page]);

  async function handleDelete(shortCode) {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      try {
        await axios.delete(
          `https://url-shortener-bootcamp.onrender.com/api/s/${shortCode}`,
          { withCredentials: true }
        );
        setUrls((prev) => prev.filter((url) => url.shortCode !== shortCode));
      } catch (err) {
        console.error("Error deleting URL:", err.response?.data || err.message);
        alert("Failed to delete URL. Please check your login or try again.");
      }
    }
  }

  function handleOpen(shortCode) {
    window.open(
      `https://url-shortener-bootcamp.onrender.com/api/s/${shortCode}`,
      "_blank"
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 0",
      }}
    >
      <Container size="lg">
        <Paper
          shadow="xl"
          radius={30}
          p="xl"
          style={{
            minWidth: 900,
            maxWidth: 1100,
            margin: "auto",
            backdropFilter: "blur(10px)",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.15)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <Text
            size="2.5rem"
            fw={700}
            style={{
              color: "#222",
              marginBottom: "2rem",
              textShadow: "rgba(0,0,0,0.15) 2px 2px 10px",
              fontWeight: "lighter",
              textAlign: "center",
            }}
          >
            My URLs
          </Text>

          <Table
            striped
            highlightOnHover
            withColumnBorders
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "0.95rem",
            }}
          >
            <thead style={{ backgroundColor: "#e0e0e0" }}>
              <tr>
                <th style={{ padding: "12px", border: "1px solid #ccc" }}>Original URL</th>
                <th style={{ padding: "12px", border: "1px solid #ccc" }}>Short Link</th>
                <th style={{ padding: "12px", border: "1px solid #ccc" }}>Clicks</th>
                <th style={{ padding: "12px", border: "1px solid #ccc" }}>Created</th>
                <th style={{ padding: "12px", border: "1px solid #ccc" }}>Expires</th>
                <th style={{ padding: "12px", border: "1px solid #ccc" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={url.shortCode} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1a73e8", textDecoration: "none" }}
                    >
                      {url.originalUrl.length > 40
                        ? url.originalUrl.slice(0, 40) + "..."
                        : url.originalUrl}
                    </a>
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{url.shortCode}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{url.clickCount || 0}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {url.createdAt
                      ? new Date(url.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {url.expiresAt ? (
                      new Date(url.expiresAt).toLocaleDateString()
                    ) : (
                      <Text c="gray">Never</Text>
                    )}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <Group gap={4}>
                      <Button
                        variant="light"
                        color="blue"
                        size="xs"
                        onClick={() => handleOpen(url.shortCode)}
                        leftSection={<IconExternalLink size={16} />}
                      >
                        Open
                      </Button>
                      <Button
                        variant="light"
                        color="red"
                        size="xs"
                        onClick={() => handleDelete(url.shortCode)}
                        leftSection={<IconTrash size={16} />}
                      >
                        Delete
                      </Button>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {urls.length === 0 && (
            <Center mt="lg">
              <Text c="gray">No URLs found.</Text>
            </Center>
          )}

          <Center mt="lg">
            <Pagination value={page} onChange={setPage} total={totalPages} />
          </Center>
        </Paper>
      </Container>
    </div>
  );
}