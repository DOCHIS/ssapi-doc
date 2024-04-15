# polling(REST API)

<table><thead><tr><th width="197">Name</th><th width="122">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>error</code></td><td>int</td><td>오류가 없을 경우 0 오류가 있을 경우 오류 코드</td></tr><tr><td><code>currentCursor</code></td><td>string</td><td>검색에 사용 된 커서</td></tr><tr><td><code>nextCursor</code></td><td>string</td><td>다음 데이터를 가져오기 위해 사용 하는 커서 (다음 데이터가 없는 경우 null)</td></tr><tr><td><code>result</code></td><td>array[<a href="../models/chat.md">chat</a>|<a href="../models/donation.md">donation</a>]</td><td>폴링 된 데이터</td></tr><tr><td><code>length</code></td><td>int</td><td>폴링 된 데이터 수</td></tr></tbody></table>

