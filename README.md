# Album Chart Viewer

A minimal, compact version of a series graph, but for music albums. A simple load and view system for previewing album rankings in a chart format.

## Album JSON Format

Format used for loading albums.

### Structure

{
  "type": "album",
  "title": "Album Name",
  "artist": null,
  "year": null,
  "coverArt": null,
  "version": 1,
  "tracks": [],
  "notes": []
}

### Fields

- `type` — Must be `"album"`.
- `title` — Album name.
- `artist` — Artist name, or `null`.
- `year` — Release year, or `null`.
- `coverArt` — Cover image path/URL, or `null`.
- `version` — Format version. You generally shouldn't need to change this.
- `tracks` — List of tracks.
- `notes` — List of notes.

### Tracks

Each track contains:

{
  "position": 1,
  "name": "Track Name",
  "rating": 7.5
}

- `position` — Track number/order.
- `name` — Track name.
- `rating` — Rating from 0–10.

### Notes

Notes are plain strings. They are associated with tracks by starting with the track name.

"Excursions: Good setup, but a little slow."

### Overall Ranking

Overall ranking is calculated in the backend. The JSON only handles individual track ratings separately.
