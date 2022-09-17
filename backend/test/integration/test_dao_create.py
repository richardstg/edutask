import pytest
from bson.objectid import ObjectId
from src.util.dao import DAO

@pytest.fixture
def create_task():
    created_tasks = []

    def _create_task(task_info):
        created_task = DAO("task").create(task_info)
        created_tasks.append(created_task)
        return created_task

    yield _create_task

    for task in created_tasks:
        DAO("task").delete(task["_id"]['$oid'])

# All required properties present, valid bson data types, unique items
@pytest.mark.integration
def test_create_task_req_present_bson_data_unique_items(create_task):
    task = create_task({"title": "t", "description": "d", "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f78")]})

    assert task['title'] == "t"

# All required properties present, invalid BSON data type for the description property, unique items
@pytest.mark.integration
def test_create_task_req_present_not_bson_data_unique_items(create_task):
    with pytest.raises(Exception) as exc_info:
        create_task({"title": "t", "description": 1, "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f78")]})

    assert "WriteError" in str(exc_info)

# All required properties not present, valid bson data types, unique items
@pytest.mark.integration
def test_create_task_req_not_present_bson_data_unique_items(create_task):
    with pytest.raises(Exception) as exc_info:
        create_task({"title": "t", "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f78")]})

    assert "WriteError" in str(exc_info)

# All required properties are not present, invalid BSON data type for the title property, items are unique
@pytest.mark.integration
def test_create_task_req_not_present_not_bson_data_unique_items(create_task):
    with pytest.raises(Exception) as exc_info:
        create_task({"title": 5, "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f78")]})

    assert "WriteError" in str(exc_info)

# All required properties are present, valid BSON data types but not unique items
@pytest.mark.integration
def test_create_task_req_present_bson_data_not_unique_items(create_task):
    with pytest.raises(Exception) as exc_info:
        create_task({"title": "t", "description": "d", "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f77")]})

    assert "WriteError" in str(exc_info)

# All required properties are present, invalid BSON data type for description field and not unique items
@pytest.mark.integration
def test_create_task_req_present_not_bson_data_not_unique_items(create_task):
    with pytest.raises(Exception) as exc_info:
        create_task({"title": "t", "description": 1, "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f77")]})

    assert "WriteError" in str(exc_info)

# All required properties are not present, valid BSON data types, not unique items
@pytest.mark.integration
def test_create_task_req_not_present_bson_data_not_unique_items(create_task):
    with pytest.raises(Exception) as exc_info:
        create_task({"title": "t", "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f77")]})

    assert "WriteError" in str(exc_info)

# All required properties are not present, invalid BSON data type for title property, not unique items
@pytest.mark.integration
def test_create_task_req_not_present_not_bson_data_not_unique_items(create_task):
    with pytest.raises(Exception) as exc_info:
        create_task({"title": 1, "requires": [ObjectId("6262346c3205050ddb303f77"), ObjectId("6262346c3205050ddb303f77")]})

    assert "WriteError" in str(exc_info)