-- Update service prices to use "from £X" format
update services
set price = 'from £60 / m²',
    updated_at = now()
where title ilike '%wall tiling%';

update services
set price = 'from £80 / m²',
    updated_at = now()
where title ilike '%floor tiling%';
