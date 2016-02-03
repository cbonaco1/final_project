json.total_count @search_results.total_count
json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.author_id = current_user.id
      if result.class == Note
        json.partial!("api/notes/notes", note: result)
      else
        json.partial!("api/notebooks/notebooks", notebook: result)
      end
    end

    json._type result.class.to_s
  end
end
