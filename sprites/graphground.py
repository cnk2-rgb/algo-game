# from PIL import Image #Kara added, 

# Reload the base image
base_image = Image.open("ground.png")
draw = ImageDraw.Draw(base_image)

# Define a greater upward offset for the graph's position
offset_x = 50
offset_y = -60  # Move further up

# Adjusted circle positions
circle_positions = [
    (100 + offset_x, 100 + offset_y),
    (150 + offset_x, 100 + offset_y),
    (100 + offset_x, 150 + offset_y),
    (150 + offset_x, 150 + offset_y),
    (125 + offset_x, 125 + offset_y)
]
circle_radius = 10

# Clear lines and redraw circles and lines in the new position
lines = [
    (0, 1, "1"),
    (0, 2, "2"),
    (1, 4, "3"),
    (2, 4, "4"),
    (3, 4, "5")
]

# Draw smaller transparent circles with black outline in the new position
for x, y in circle_positions:
    draw.ellipse(
        (x - circle_radius, y - circle_radius, x + circle_radius, y + circle_radius),
        outline="black", width=2, fill=None
    )

# Draw lines and black labels in the new position
for start_idx, end_idx, label in lines:
    x1, y1 = circle_positions[start_idx]
    x2, y2 = circle_positions[end_idx]
    draw.line((x1, y1, x2, y2), fill="black", width=1)
    # Calculate midpoint for label
    label_x, label_y = (x1 + x2) / 2, (y1 + y2) / 2
    draw.text((label_x, label_y), label, fill="black")

# Save and display the updated image
output_path_moved_up = "/mnt/data/ground_with_graph_moved_up.png"
base_image.save(output_path_moved_up)
output_path_moved_up
