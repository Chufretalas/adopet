WITH USER_RECEIVER (id, receiver_id, receiver_name) AS(
    SELECT
        messages.id,
        messages.receiver_id,
        users.name AS receiver_name
    FROM
        messages
        JOIN users ON messages.receiver_id = users.id
    WHERE
        messages.sender_id = 3
        OR messages.receiver_id = 3
)
SELECT
    messages.sender_id,
    users.name AS sender_name,
    USER_RECEIVER.receiver_id,
    USER_RECEIVER.receiver_name
FROM
    messages
    JOIN users ON messages.sender_id = users.id
    JOIN USER_RECEIVER ON messages.id = USER_RECEIVER.id
WHERE
    messages.sender_id = 3
    OR messages.receiver_id = 3;