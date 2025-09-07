import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import noPhoto from "../../assets/photo-cover.svg";
import {
  Box,
  CardMedia,
  Tooltip,
  tooltipClasses,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--Black-87, rgba(0, 0, 0, 0.87))",
    fontSize: 16,
    display: "inline-flex",
    padding: "3px 16px",
    borderRadius: "4px",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "none",
  },
}));

export default function UserCard({
  name,
  email,
  phone,
  position,
  photo,
  isLoading,
}) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "254px",
        borderRadius: "16px",
        boxShadow: 0,
      }}
    >
      <CardMedia
        sx={{
          justifyContent: "center",
          display: "flex",
          marginTop: "20px",
        }}
      >
        {!isLoading ? (
          <Avatar
            sx={{
              width: "70px",
              height: "70px",
            }}
            alt={noPhoto}
            src={photo}
          />
        ) : (
          <Skeleton variant="circular" width={70} height={70} />
        )}
      </CardMedia>
      <CardContent
        sx={{
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "16px",
            justifyContent: "center",
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography noWrap>{name}</Typography>
        </Box>
        <Typography
          noWrap
          sx={{
            fontSize: "16px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {position}
        </Typography>
        <Box
          sx={{
            fontSize: "16px",
            justifyContent: "center",
            display: "flex",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography noWrap variant="body16">
            <CustomTooltip title={email}>
              <span>{email}</span>
            </CustomTooltip>
          </Typography>
        </Box>
        <Typography
          noWrap
          sx={{
            fontSize: "16px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {phone}
        </Typography>
      </CardContent>
    </Card>
  );
}
